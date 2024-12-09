const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random()}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export default getSessionId