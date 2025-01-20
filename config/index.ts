type Config = {
  stripe: {
    publicKey: string;
    prices: {
      monthly: string;
      lifetime: string;
    };
    products: {
      monthly: string;
      lifetime: string;
    };
  };
};

export const config: Config = {
  stripe: {
    publicKey:
      process.env.NODE_ENV === "development"
        ? (process.env.NEXT_PUBLIC_STRIPE_KEY as string)
        : (process.env.NEXT_PUBLIC_PROD_STRIPE_KEY as string),
    prices: {
      monthly:
        process.env.NODE_ENV === "development"
          ? "price_1QLFnZ13J47EyIocb3cTunjJ"
          : "price_1Q4isS13J47EyIocYAhrrr79",
      lifetime:
        process.env.NODE_ENV === "development"
          ? "price_1QLFnx13J47EyIocFjubJozY"
          : "price_1Q4it413J47EyIocRdzgTwAD",
    },
    products: {
      monthly:
        process.env.NODE_ENV === "development"
          ? "prod_RDhB1cVQU2LYqV"
          : "prod_Qwc6Edo9LCw2tA",
      lifetime:
        process.env.NODE_ENV === "development"
          ? "prod_RDhCXXnxlxtUl7"
          : "prod_Qwc7MGsgVhIIZ4",
    },
  },
};
