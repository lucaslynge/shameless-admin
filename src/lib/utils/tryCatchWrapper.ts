type Options = {
  onError: (error: any) => void;
  finally: VoidFunction;
};

export const tryCatchWrapper = (call: VoidFunction, options: Options) => {
  try {
    call();
  } catch (error) {
    if (options.onError) {
      options.onError(error);
    }
  } finally {
    if (options.finally) {
      options.finally();
    }
  }
};
