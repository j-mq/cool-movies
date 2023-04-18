import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 56px;
  border-radius: 8px 0px 0px 8px;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
  color: ${(props) => props.theme.primaryDarkest};
  background: ${(props) => props.theme.primaryLight};

  ::placeholder {
    color: ${(props) => props.theme.primary};
    font-style: italic;
  }
`;

const SearchButton = styled.button`
  height: 56px;
  width: 56px;
  border-radius: 0px 8px 8px 0px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.primaryDark};
  box-shadow: ${(props) => props.theme.shadowLevel1};

  .material-symbols-outlined {
    font-size: 32px;
    color: ${(props) => props.theme.primaryLight};
  }

  :active {
    box-shadow: none;
    background: ${(props) => props.theme.primary};
  }
`;

type SearchAreaProps = {
  searchEntry: string;
  onChangeSearchEntry: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressSearchEntry: (event: React.KeyboardEvent) => void;
  onSearch: () => void;
};

const SearchArea = ({
  searchEntry,
  onChangeSearchEntry,
  onKeyPressSearchEntry,
  onSearch,
}: SearchAreaProps) => {
  return (
    <SearchContainer>
      <SearchInput
        type='text'
        value={searchEntry}
        onChange={onChangeSearchEntry}
        onKeyPress={onKeyPressSearchEntry}
        placeholder='Search for a movie title...'
        maxLength={191}
      />
      <SearchButton onClick={onSearch}>
        <span className='material-symbols-outlined'>search</span>
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchArea;
