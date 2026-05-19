import { NextRequest, NextResponse } from 'next/server';

// In production, replace with actual database/email service
// Example: SendGrid, Mailchimp, Resend, Supabase, etc.

interface SubscribeRequest {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database storage
    // Example with a database:
    // await db.subscribers.create({ email, subscribedAt: new Date() });

    // Example with email service:
    // await sendWelcomeEmail(email);

    // For now, log and return success
    console.log(`[SUBSCRIBE] New subscriber: ${email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!',
        // In production, include user info from your database
        subscriber: {
          email,
          subscribedAt: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[SUBSCRIBE] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Subscribe API - POST with { email: string }' },
    { status: 200 }
  );
}