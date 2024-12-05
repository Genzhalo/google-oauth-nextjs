export function EmbedFile({ src }: React.HTMLProps<HTMLEmbedElement>) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <embed
        style={{ width: "600px", height: "800px", flex: 1 }}
        src={src}
      ></embed>
    </div>
  );
}
