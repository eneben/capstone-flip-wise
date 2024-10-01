export default function MenuItem({ content, collections, isSubmenu, page }) {
  const [isCollections, setIsCollections] = useState(false);

  return (
    <>
      <StyledNavigationListItem>
        <StyledNavigationLink
          href={`/${page}`}
          onClick={() => {
            changeFlashcardSelection("all");
            setIsMenuClosing(true);
            setIsCollectionsClosing(true);
          }}
        >
          {content}
        </StyledNavigationLink>

        {isSubmenu && (
          <StyledSubMenuArrow
            $isRotate={isCollections}
            onClick={handleToggleCollections}
          />
        )}
      </StyledNavigationListItem>

      {isCollections && (
        <StyledSubNavigationList>
          {collections.map((collection) => {
            return (
              <StyledSubNavigationListItem
                key={collection.id}
                $isCollectionsClosing={isCollectionsClosing}
              >
                <StyledSubNavigationLink
                  href={`/${page}/${collection.id}`}
                  onClick={() => {
                    changeFlashcardSelection("all");
                    setIsMenuClosing(true);
                    setIsCollectionsClosing(true);
                  }}
                >
                  {collection.title} (
                  {getAllFlashcardsFromCollection(collection.id).length})
                </StyledSubNavigationLink>
              </StyledSubNavigationListItem>
            );
          })}
        </StyledSubNavigationList>
      )}
    </>
  );
}

const subMenuAnimationOpen = keyframes`
0% { height: 0px; opacity: 0;}
100% { height: 35px; opacity: 1;}
`;

const subMenuAnimationClose = keyframes`
0% { height: 35px; opacity: 1;}
100% { height: 0px; opacity: 0;}
`;

const StyledNavigationListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
`;

const StyledSubNavigationList = styled.ul`
  font-weight: 500;
  font-size: 0.9rem;
  list-style: none;
`;

const StyledSubNavigationListItem = styled.li`
  animation: ${(props) =>
    props.$isCollectionsClosing
      ? css`
          ${subMenuAnimationClose} 0.3s ease-out
        `
      : css`
          ${subMenuAnimationOpen} 0.3s ease-out
        `};
  height: 35px;
  border-top: 1px solid #000;
  text-align: center;

  &:nth-of-type(1) {
    border-top: 0;
  }
`;

const StyledNavigationLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledSubNavigationLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const StyledSubMenuArrow = styled(SubMenuArrow)`
  rotate: ${(props) => (props.$isRotate ? "1.5turn" : "0")};
  transition: 0.3s ease-out;
`;
