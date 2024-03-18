const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  }

  return (
    <>
      {message && <div className="message">{message}</div>}
      {errorMessage && <div className="errormessage">{errorMessage}</div>}
    </>
  );
};

export default Notification;
