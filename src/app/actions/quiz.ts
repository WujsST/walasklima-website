'use server';

import { createClient } from '@/lib/supabase/server';
import { QuizSubmission, QuizSubmissionResponse } from '@/types/quiz';
import { headers } from 'next/headers';

export async function submitQuiz(data: QuizSubmission): Promise<QuizSubmissionResponse> {
  try {
    const supabase = await createClient();
    const headersList = await headers();

    // Get client metadata
    const userAgent = headersList.get('user-agent') || 'unknown';
    const forwarded = headersList.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : null;

    const { data: result, error } = await supabase
      .from('quiz_submissions')
      .insert([
        {
          quiz_type: data.quiz_type,
          answers: data.answers,
          name: data.name,
          phone: data.phone,
          email: data.email,
          company: data.company,
          notes: data.notes,
          user_agent: userAgent,
          ip_address: ipAddress,
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Server action error:', error);
    return {
      success: false,
      error: 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.',
    };
  }
}
