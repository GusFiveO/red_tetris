export const getGoogleUrl = (from: string) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
    console.log(import.meta.env.VITE_GOOGLE_REDIRECT_URI)
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI as string,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: from,
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`;
  };
  