export default function Title({
  heading = "h2",
  title = "Title",
  className,
  fontFamily="PoppinsSemiBold"
  
}) {
  switch (heading) {
    case "h1":
      // code block
      return (
        <h1
     
          className={`lg:text-6xl text-4xl   font-PoppinsBold  ${className} `}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h1>
      );
    case "h2":
      return (
        <h2
        style={{
          fontFamily:fontFamily
        }}
          className={`lg:text-5xl md:text-3xl  text-3xl  ${className}`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
      );
    case "h3":
      return (
        <h3
        className={`lg:text-4xl md:text-3xl  text-3xl font-PoppinsMedium ${className}`}
        dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
      );
    case "h4":
      return (
        <h4
          className={` ${className} text-3xl  font-bold  `}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
      );
    case "h5":
      return (
        <h5
          className={` ${className} sm:text-2xl font-PoppinsBold   text-xl `}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h5>
      );

    case "h6":
      return (
        <h6
          className={`sm:text-lg text-[11px]
              font-bold  leading-none  ${className}	`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h6>
      );
      break;
 
    default:
      return (
        <h4
          className={`text-base   ${className}`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
      );
  }
}
