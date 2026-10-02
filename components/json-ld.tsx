/**
 * Insertion d'un bloc de données structurées.
 *
 * `JSON.stringify` échappe les guillemets mais pas la séquence `</script`, qui
 * clôturerait la balise depuis l'intérieur d'une chaîne. On la neutralise, comme
 * les chevrons isolés, avant injection.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
