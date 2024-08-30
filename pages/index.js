import Collection from "@/components/Collection/Collection";

export default function CollectionList({ collections }) {
  return (
    <Collection
      name="Test-Collection"
      correctCounter="5"
      incorrectCounter="2"
      color="#f00"
    />
  );
}
