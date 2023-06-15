import { FiPlus } from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { ButtonText } from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { Note } from "../../components/Note"
import { Header } from "../../components/Header"
import { api } from "../../services"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export function Home() {
const [notes, setNotes] = useState([]);
const [search, setSearch] = useState("");
const [tags, setTags] = useState([]);
const [tagsSelected, setTagsSelected] = useState([]);

const navigate = useNavigate();

function handleTagsSelected(tagName) {
    if(tagName === "all") {
        return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);
    if(alreadySelected) {
        const filteredTags = tagsSelected.filter(tag => tag !== tagName);
        setTagsSelected(filteredTags);
    } else {
    setTagsSelected(prevState => [...prevState, tagName]);
    }
};

function handleDetails(id){
    navigate(`/details/${id}`);
};


useEffect(() => {
    async function fetchNotes() {
        const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
        setNotes(response.data)
    }
    fetchNotes();
}, [tagsSelected, search])

useEffect(() => {
    async function fetchTags() {
        const response = await api.get("/tags");
        setTags(response.data)
    }
    fetchTags();
}, [])


    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>           
            </Brand>
            <Header/>

            <Menu>
             <li><ButtonText isActive={tagsSelected.length === 0} title="Todos" onClick={() => handleTagsSelected("all")} /></li>
             {
                tags && tags.map(tag => (
                    <li key={String(tag.id)}>
                    <ButtonText 
                    title={tag.name}
                    onClick={() => handleTagsSelected(tag.name)}
                    isActive={tagsSelected.includes(tag.name)}
                    />
                    </li>
                ))
             }
            </Menu>

            <Search>
             <Input 
             placeholder="Pesquisar pelo título"
             onChange={(e) => setSearch(e.target.value)} 
             />
            </Search>

            <Content>
              <Section title="Minhas notas" />
                {    
                    notes.map(note => (
                    <Note 
                    key={String(note.id)}
                    data={note}
                    onClick={() => handleDetails(note.id)}
                    />
                    ))
                }
            </Content>

            <NewNote to="/new">
              <FiPlus />
              Criar nota
            </NewNote>
        </Container>
    )
}