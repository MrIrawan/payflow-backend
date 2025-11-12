export const successPayload = (succesMessage, successData) => {
  return {
    status: "Success",
    message: succesMessage,
    data: {
      user: {
        id: successData.user.id,
        email: successData.user.email,
        created_at: successData.user.created_at,
        email_confirm_at: successData.user.email_confirmed_at,
        metadata: successData.user.user_metadata,
      },
      session: {
        access_token: successData.session.access_token,
        refresh_token: successData.session.refresh_token,
        token_type: successData.session.token_type,
        expires_at: successData.session.expires_at,
        expires_in: successData.session.expires_in,
      },
    },
  };
};
