export default function Text({
  text,
  paragraph,
  align = "left",
  className,
  color='#787486'
}) {
  switch (paragraph) {
    case "p":
      return (
        <p
          style={{
            textAlign: align,
            color:color
          }}
          className={`text-base  ${className}`}
        >
          {text}
        </p>
      );
    case "p-bold":
        return (
          <p
            style={{
              textAlign: align,
              color:color
            }}
            className={`text-base font-PoppinsSemiBold  ${className}`}
          >
            {text}
          </p>
        );
    case "p-small":
      return (
        <p
          style={{
            color:color,
            textAlign: align,


          }}
          className={`text-sm   ${className}`}
        >
          {text}
        </p>
      );
      case "p-small-bold":
        return (
          <p
            style={{
              textAlign: align,
              color:color
  
            }}
            className="text-sm font-PoppinsSemiBold"
          >
            {text}
          </p>
        );
        case "p-small-bold-link":
          return (
            <p
              style={{
                textAlign: align,
                color:color
    
              }}
              className="text-sm cursor-pointer font-PoppinsSemiBold"
            >
              {text}
            </p>
          );
    case "p-trancate":
      return (
        <p
          style={{
            textAlign: align,
            color:color

          }}
          className={`text-base truncate   ${className}`}
        >
          {text}
        </p>
      );

    default:
      return (
        <p
          style={{
            textAlign: align,
            color:color

          }}
          className={`text-base text-[#787486] ${className}`}
        >
          {text}
        </p>
      );
  }
}
