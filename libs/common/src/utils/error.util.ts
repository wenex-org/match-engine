export const serializeException = (exception: any) => {
  const { name, status, message, stack } = exception ?? {};
  return JSON.stringify({ name, status, message, stack, data: exception });
};
