// Server component: esporta i metadata richiesti dallo Studio (viewport, etc.)
// e applica zero-chrome (lo Studio gestisce tutta la UI da solo).
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
