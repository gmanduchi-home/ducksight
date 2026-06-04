import Image from "next/image";

type Props = {
  className?: string;
  /** Dimensione in px (lato del quadrato). Default 80. Per nitidezza Next ottimizza. */
  size?: number;
  priority?: boolean;
};

/**
 * Logo ufficiale The Duck Sight Studio — papera stilizzata con occhio-obiettivo,
 * cerchio crema. File in public/logo.png (Logo_img_tondo originale).
 */
export function DuckLogo({ className, size = 80, priority = false }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="The Duck Sight Studio logo"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  );
}
