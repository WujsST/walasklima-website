# Walas Klima — Pitch wdrożenia sklepu online

**Wersja:** 1.0 · **Data:** 2026-04-07
**Klient:** Walas Klima · **Cel:** sprzedaż pomp ciepła, klimatyzacji i osuszaczy przez sklep online zintegrowany z istniejącym landing page.

---

## 1. Executive summary

Walas Klima otrzymuje kompletny **headless e-commerce stack**, w którym:

- Landing page `walasklima.pl` pozostaje naszym autorskim frontem React + GSAP (pełna kontrola nad designem, animacjami, SEO).
- Silnikiem sklepu jest **Shopify** (headless) — ale klient nigdy nie zobaczy "shopify look & feel". Produkty, magazyn, checkout, płatności i wysyłki obsługuje Shopify, a UI jest w 100% naszej roboty.
- Sklep żyje pod subdomeną **`sklep.walasklima.pl`** (alias tego samego deploymentu na Vercel → brak duplikacji kodu).
- Płatności: **Przelewy24 z BLIKiem**. Dostawa: **InPost Paczkomaty** (+ kurier fallback). OMS/fakturowanie: **BaseLinker** (rekomendowane) albo **Apilo** — porównanie niżej.
- Landing już ma dwa pre-sales instrumenty: **agenta głosowego ElevenLabs ConvAI** (24/7) oraz **interaktywny quiz** klasyfikujący leady. Lead ze quizu leci do **Airtable/Google Sheets/Notion** (tani pipeline zamiast pełnego CRM na start).

Czas uruchomienia sklepu z istniejącego landinga: **~5–10 dni roboczych** po otrzymaniu poprawnych credentiali i domeny.

---

## 2. Architektura systemu

```
┌────────────────────────────────────────────────────────────────────┐
│                         UŻYTKOWNIK                                 │
└──────────────┬─────────────────────────────────┬───────────────────┘
               │                                 │
               ▼                                 ▼
   walasklima.pl (landing)            sklep.walasklima.pl (shop)
   ┌──────────────────────┐           ┌──────────────────────┐
   │ React + Vite + GSAP  │           │ React + Vite         │
   │ Hero / Manifest      │           │ /sklep (listing)     │
   │ Quiz (4 ścieżki)     │           │ /sklep/:handle       │
   │ ElevenLabs ConvAI    │           │ /koszyk              │
   └─────────┬────────────┘           └──────────┬───────────┘
             │                                   │
             │ quiz payload                      │ Storefront API (GraphQL)
             │ (webhook)                         │
             ▼                                   ▼
   ┌──────────────────────┐           ┌──────────────────────┐
   │ Airtable / Sheets    │           │ Shopify (headless)   │
   │ /Notion — lead pipe  │           │ - katalog produktów  │
   │ klasyfikacja leadów  │           │ - checkout           │
   └──────────────────────┘           │ - inventory          │
                                      └──────────┬───────────┘
                                                 │ webhook orders/paid
                                                 ▼
                                      ┌──────────────────────┐
                                      │ BaseLinker / Apilo   │
                                      │ - faktury VAT        │
                                      │ - etykiety InPost    │
                                      │ - zamówienia         │
                                      └──────────────────────┘
                                                 │
                                                 ▼
                                      Przelewy24 (BLIK/karty) · InPost Paczkomaty
```

---

## 3. Komponenty i uzasadnienie

### 3.1 Frontend — landing + sklep (już istnieje)

- **Vite 7 + React 19 + Tailwind 3 + GSAP** — jeden repo, jeden deploy, dwie domeny:
  - `walasklima.pl` → strona główna i sekcje marketingowe
  - `sklep.walasklima.pl` → alias tego samego projektu, host-based redirect `/` → `/sklep`
- Tryb SPA na Vercel (framework preset `vite`, rewrite wszystkiego do `index.html`).
- Zero duplikacji: jeden kod źródłowy, jeden CI/CD, jeden rollback. Wadą jest wspólny release — mitigacja: **Rolling Releases** na Vercel dla stopniowego rollouta.

### 3.2 Shopify (headless commerce engine)

- **Plan Shopify Basic — $39/mies** (wystarcza do startu, nieograniczona liczba SKU, 2 lokalizacje magazynowe, wsparcie PL).
- Komunikacja przez **Storefront API** (publiczny token, GraphQL, 2025-10).
- Warstwa już zaimplementowana w kodzie: `src/lib/shopify/{client,api,queries,mutations}.js`.
- Checkout: **Shopify native checkout** na `checkout.shopify.com` — zgodny z RODO, kartami, BLIK, obsługuje kody rabatowe, podatki PL (23% VAT), faktury automatyczne.
- Zalety vs WooCommerce / Prestashop / custom: **zero utrzymania serwera, SLA, PCI-DSS out of the box, checkout conversion > 15%** (Shopify benchmark), natywne integracje PL przez App Store.

### 3.3 Płatności — Przelewy24

- **Natywna integracja Shopify** przez "Alternative payment providers" (Settings → Payments).
- Obsługuje: **BLIK, karty (Visa/MC), pay-by-link (mBank, PKO, ING, ...), Apple Pay, Google Pay**.
- Prowizja: **0.9–1.5%** (negocjowalna powyżej 100k/mies obrotu).
- Rozliczenie D+1, wsparcie w PL, panel Partnera P24.

### 3.4 Dostawa — InPost Paczkomaty

- Aplikacja **InPost Official** w Shopify App Store (darmowa, oficjalna).
- W checkoucie klient wybiera paczkomat z mapy (widget InPost GeoWidget).
- Etykiety generowane automatycznie po `orders/paid` (z poziomu Shopify lub BaseLinker/Apilo).
- Waga pomp ciepła > 25kg → automatyczny fallback na **kuriera paletowego** (DPD/DHL) dla tych wariantów produktowych (reguły shipping zones w Shopify).

### 3.5 OMS / fakturowanie — BaseLinker vs Apilo

| Cecha | **BaseLinker** (rekomendacja) | **Apilo** |
|---|---|---|
| Start (miesięcznie) | od ~149 PLN | od ~249 PLN |
| Integracja z Shopify | Natywna, dwukierunkowa | Natywna, dwukierunkowa |
| Faktury VAT (PL) | Tak, integracja wFirma/inFakt/fakturownia | Tak, wbudowany moduł fakturowy |
| Etykiety InPost | Tak + Allegro, DPD, DHL, Orlen, Poczta | Tak + szeroki ekosystem |
| Multi-warehouse | Tak (płatne moduły) | Tak, głębsze (natywne) |
| Allegro/Amazon/eBay | Świetne — to kręgosłup narzędzia | Dobre |
| Automatyzacje | Edytor reguł "if-this-then-that" | Bardziej enterprise workflow |
| Learning curve | Niska — świetna baza wiedzy PL | Średnia |
| Target | SMB, start e-commerce | Średnie i większe firmy, magazyny |

**Rekomendacja: BaseLinker** — profil Walas Klima (niska liczba SKU, duży ticket ~10–40k PLN, sprzedaż B2C + B2B, start bez rozbudowanego magazynu) najlepiej pasuje do BaseLinkera. Niższy koszt miesięczny, szybsze wdrożenie, pełne fakturowanie VAT i etykiety InPost w standardzie. **Apilo** warto rozważyć dopiero przy skalowaniu do 3+ magazynów lub integracji z B2B EDI.

### 3.6 Agent głosowy — ElevenLabs ConvAI (już wdrożony)

- Widget `<elevenlabs-convai>` osadzony globalnie w `index.html`.
- Agent ID: `agent_7801kjk27eh6fbjrdtagzdymsay3`.
- Rola: **24/7 preselekcja leadów** — odbiera pytania typu "ile kosztuje pompa ciepła do domu 150m²", kieruje do quizu lub konkretnego produktu, umawia rozmowę.
- Koszt: pay-per-minute ElevenLabs (~$0.08–0.15/min konwersacji), pierwsze minuty darmowe.
- Możliwość podłączenia bazy wiedzy (PDF-y producentów, cenniki) w panelu ElevenLabs — agent odpowiada precyzyjnie bez halucynacji.

### 3.7 Quiz z klasyfikacją leadów (już wdrożony, do podpięcia pipeline)

Quiz w `src/pages/Quiz.jsx` — 4 ścieżki:

1. **Klimatyzacja do domu / biura** — 9 pytań (typ budynku, powierzchnia, nasłonecznienie, kondygnacja, izolacja, ...)
2. **Klimatyzacja samochodowa** — 2 pytania
3. **Klimatyzacja przenośna / serwis** — 4 pytania
4. **Osuszanie** — 5 pytań

Finalny payload (propozycja — do wpięcia jako webhook):

```json
{
  "leadId": "lead_20260407_001",
  "source": "quiz",
  "quizType": "home_ac",
  "answers": { "buildingType": "dom", "areaM2": 150, "..." : "..." },
  "contact": { "name": "...", "phone": "...", "email": "...", "company": "" },
  "classification": {
    "segment": "B2C",
    "intent": "hot",
    "product": "pompa_ciepla",
    "budgetHint": "30-50k",
    "urgency": "this_month",
    "areaM2": 150
  },
  "createdAt": "2026-04-07T12:34:56Z"
}
```

**Pipeline leadów (zamiast klasycznego CRM — decyzja klienta):**

| Opcja | Koszt | Zalety | Wady |
|---|---|---|---|
| **Airtable** (rekomendacja) | Free do 1000 rek., 20$/mies Plus | Baza + widoki kanban, webhooki, formularze, API, łatwa klasyfikacja | Limit rekordów na free |
| **Google Sheets** | Free | Zero kosztu, każdy zna | Brak kanbana, słabe automatyzacje |
| **Notion** | Free osobiste, 8$/mies team | Piękne widoki, dokumenty + baza | Słabsze API, wolniejsze |

Rekomendacja: **Airtable** — dostajemy od razu widoki "Hot leads", "Do oddzwonienia dzisiaj", "Wysłana oferta", automatyzacje e-mail, webhook z Vercel Function (`/api/quiz-lead`). Migracja do HubSpot/Pipedrive w przyszłości = 1 dzień pracy.

---

## 4. Flow zamówienia (happy path)

1. **Klient trafia na landing** `walasklima.pl` (SEO / Google Ads / social).
2. Robi **quiz** → lead ląduje w Airtable z klasyfikacją `intent: hot, product: pompa_ciepla`.
3. Dzwoni **ElevenLabs agent** (lub klient dzwoni do niego z widgetu) → umawia konsultację / kieruje do `sklep.walasklima.pl`.
4. Na sklepie klient wybiera pompę ciepła → dodaje do koszyka → klika "Przejdź do kasy".
5. **Shopify checkout** → wybiera **BLIK** (Przelewy24) → wybiera **paczkomat InPost** (lub kurier paletowy jeśli >25kg).
6. Płatność potwierdzona → webhook `orders/paid` → **BaseLinker**:
   - Generuje fakturę VAT (integracja z wFirma/fakturownia).
   - Generuje etykietę InPost.
   - Tworzy zadanie "spakuj + nadaj" dla magazynu.
7. Klient dostaje e-mail z fakturą + trackingiem. Lead w Airtable zmienia status na **"Zamówił"**.

---

## 5. Co już jest gotowe w landing page (spec)

- **Design system:** Tailwind + custom palette (Organic Tech preset), fonts Outfit + Playfair Display + JetBrains Mono
- **Sekcje:** Hero cinematic, Value propositions, Manifest, Protokół, Testimoniale, FAQ, Footer
- **Quiz:** 4 ścieżki z dynamicznymi pytaniami warunkowymi (home/auto/portable/osuszanie)
- **Agent głosowy ElevenLabs ConvAI** — embeddedowy widget na wszystkich podstronach
- **Sklep:** `/sklep` (grid produktów), `/sklep/:handle` (karta produktu), `/koszyk` (CartContext + localStorage)
- **Polityka prywatności + cookies** — strony prawne pod `/polityka-prywatnosci`, `/polityka-cookies`
- **Performance:** Lighthouse target ≥90 na mobile (Vite code splitting, lazy routing, image lazy loading)
- **SEO:** meta tagi, semantyczny HTML, schema.org/Product dla produktów (do dopięcia)
- **Responsywność:** Mobile-first, stackowanie pionowe <768px

---

## 6. Harmonogram wdrożenia (5 faz × ~1–2 dni)

| Faza | Zadania | Czas |
|---|---|---|
| **1. Shopify setup** | Utworzenie konta, dodanie produktów (pompy ciepła, klimatyzacje, osuszacze), zdjęcia, opisy, warianty, wagi/wymiary | 1–2 dni (po stronie klienta) |
| **2. Integracja frontu** | Podmiana Storefront API tokena, smoke test, weryfikacja `/sklep`, `/koszyk`, checkout, podłączenie subdomeny `sklep.walasklima.pl` | 0.5 dnia |
| **3. Płatności + dostawa** | Aktywacja Przelewy24 (BLIK), instalacja InPost App, konfiguracja stref wysyłki, reguły dla produktów >25kg | 1 dzień |
| **4. OMS (BaseLinker)** | Rejestracja BaseLinker, podłączenie Shopify, integracja z fakturownia/wFirma, etykiety InPost, testowy order | 1 dzień |
| **5. Quiz → Airtable + Go-live** | Vercel Function `/api/quiz-lead`, tabela Airtable, klasyfikacja, test end-to-end, go-live, monitoring | 1 dzień |

**RAZEM: ~5–6 dni roboczych** od momentu otrzymania poprawnych credentiali.

---

## 7. Koszty miesięczne (szacunek)

| Pozycja | Koszt netto |
|---|---|
| Shopify Basic | ~160 PLN ($39) |
| Przelewy24 | ~1% obrotu (zmiennie) |
| InPost Paczkomaty | ~11–15 PLN/paczka |
| BaseLinker | ~149–249 PLN |
| Vercel Hobby → Pro (opcjonalnie przy skali) | 0 → ~80 PLN ($20) |
| Airtable Free → Plus | 0 → ~80 PLN ($20) |
| ElevenLabs ConvAI | ~pay-per-use, ~50–200 PLN/mies |
| Domeny + SSL | ~100 PLN/rok (już masz) |
| **Razem fixed** | **~400–700 PLN/mies** |
| **Razem variable** | **~1% GMV + koszty paczek** |

---

## 8. Ryzyka i mitigacje

| Ryzyko | Mitigacja |
|---|---|
| VAT OSS / limity UE (sprzedaż poza PL) | Shopify obsługuje automatycznie Markets + stawki VAT dla EU |
| RODO (formularze quizu, dane klientów) | Polityka prywatności + cookie banner już są; DPA z Shopify + BaseLinker + Airtable |
| Zwroty pomp ciepła (B2C — 14 dni) | Reguły zwrotów w Shopify + procedura w BaseLinker; produkty wielkogabarytowe = odbiór kurierem |
| Gwarancje producentów | Link do warunków gwarancji na karcie produktu + w fakturze |
| Awaria checkoutu Shopify | SLA 99.9% Shopify, rollback przez Vercel Rolling Releases na froncie |
| Wzrost ruchu / peaks sezonowe | Shopify auto-scale; Vercel fluid compute dla API routes |
| Token Storefront API wycieka | Token **publiczny** z ograniczonymi uprawnieniami (read-only katalog + cart) — bezpieczny w browser |

---

## 9. Następne kroki (action items dla klienta)

1. ✅ Utworzyć / potwierdzić konto **Shopify** i wygenerować **Storefront API access token** (nie Admin token!) w Settings → Apps → Develop apps → Storefront API.
2. ✅ Dodać produkty — minimum 5–10 SKU na start (zdjęcia 2000×2000, opisy, ceny, wagi).
3. ✅ Aplikować o **Przelewy24** (KRS / dane firmy) — 1–3 dni weryfikacji.
4. ✅ Zainstalować aplikację **InPost** w Shopify App Store.
5. ✅ Wybrać **BaseLinker vs Apilo** (rekomendujemy BaseLinker).
6. ✅ Zdecydować **Airtable / Google Sheets / Notion** dla pipeline leadów (rekomendujemy Airtable).
7. ✅ Dać dostęp do DNS domeny `walasklima.pl` (rekord CNAME dla `sklep`).

---

## 10. Dlaczego ten stack wygrywa

- **Nie jest to WordPress / WooCommerce** — brak wtyczek do utrzymywania, brak aktualizacji, brak podatności.
- **Nie jest to pełny custom** — nie wymyślamy koła na nowo, checkout + płatności + podatki mamy out-of-the-box od Shopify.
- **Mamy pełną kontrolę nad UX** — headless frontend = każdy piksel i każda animacja po naszej stronie. Klient dostaje landing, który wygląda jak agencja premium, a nie jak generyczny sklep Shopify.
- **Skalowalność** — stack gotowy na 10 zamówień miesięcznie jak i 1000. Shopify + Vercel + BaseLinker skalują się liniowo, bez przepisywania kodu.
- **Lead generation wbudowany w core** — quiz + agent głosowy to **dwa automatyczne SDR-y 24/7** dla Walas Klima. Tego nie ma żaden konkurent w branży HVAC w PL.

---

*Dokument przygotowany jako materiał sprzedażowy do prezentacji Walas Klima. Wersja techniczna (implementacja) dostępna w repo `walasklima-website/`.*
