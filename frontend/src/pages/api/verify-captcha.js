export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ 
      success: false, 
      message: 'CAPTCHA token is required' 
    });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error' 
      });
    }

    // Verify the CAPTCHA token with Google
    const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${captchaToken}`,
      }
    );

    const verificationResult = await verificationResponse.json();

    if (verificationResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'CAPTCHA verified successfully' 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'CAPTCHA verification failed',
        errors: verificationResult['error-codes'] || []
      });
    }
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during CAPTCHA verification' 
    });
  }
}
