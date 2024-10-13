import { useEffect, useState } from "react";

export default function TryOpenAi() {
  const textInput =
    "A cockatoo is any of the 21 species of parrots belonging to the family Cacatuidae, the only family in the superfamily Cacatuoidea. Along with the Psittacoidea (true parrots) and the Strigopoidea (large New Zealand parrots), they make up the order Psittaciformes. The family has a mainly Australasian distribution, ranging from the Philippines and the eastern Indonesian islands of Wallacea to New Guinea, the Solomon Islands and Australia. Cockatoos are recognisable by the prominent crests and curved bills. Their plumage is generally less colourful than that of other parrots, being mainly white, grey or black and often with coloured features in the crest, cheeks or tail. On average they are larger than other parrots; however, the cockatiel, the smallest cockatoo species, is medium-sized.[3] The phylogenetic position of the cockatiel remains unresolved, except that it is one of the earliest offshoots of the cockatoo lineage. The remaining species are in two main clades. The five large black-coloured cockatoos of the genus Calyptorhynchus form one branch. The second and larger branch is formed by the genus Cacatua, comprising 12 species of white-plumaged cockatoos and three monotypic genera that branched off earlier; namely the pink and grey galah, the mainly grey gang-gang cockatoo and the large black-plumaged palm cockatoo. Cockatoos prefer to eat seeds, tubers, corms, fruit, flowers and insects. They often feed in large flocks, particularly when ground-feeding. Cockatoos are monogamous and nest in tree hollows. Some cockatoo species have been adversely affected by habitat loss, particularly from a shortage of suitable nesting hollows after large mature trees are cleared; conversely, some species have adapted well to human changes and are considered agricultural pests. Cockatoos are popular birds in aviculture, but their needs are difficult to meet. The cockatiel is the easiest cockatoo species to maintain and is by far the most frequently kept in captivity. White cockatoos are more commonly found in captivity than black cockatoos. Illegal trade in wild-caught birds contributes to the decline of some cockatoo species in the wild.";
  const numberOfFlashcards = 10;

  const [flashcards, setFlashcards] = useState([]);

  async function getAiFlashcards(textInput, numberOfFlashcards) {
    try {
      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textInput,
          numberOfFlashcards,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setFlashcards(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getAiFlashcards(textInput, numberOfFlashcards);
  }, []);

  if (flashcards.length === 0) {
    return <p style={{ paddingTop: "20px" }}>Loading...</p>;
  }

  return (
    <>
      {flashcards.map((flashcard) => {
        return (
          <div style={{ paddingTop: "20px" }} key={flashcard.question}>
            <p>Question: {flashcard.question}</p>
            <p>Answer: {flashcard.answer}</p>
          </div>
        );
      })}
    </>
  );
}