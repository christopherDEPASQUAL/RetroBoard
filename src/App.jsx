import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DashboardContainer from './components/Dashboard/DashboardContainer.jsx';
import MarkdownContainer from './components/Markdown/MarkdownContainer.jsx'
import Nav from './components/nav'
import "./styles/reset.css";
import './styles/global.css';



function App() {

  // création state markdown
  const [markdowns, setMarkdowns] = useState([]);

  // création de markdown (via form)
  function ajouterMarkdown(title, content) {
    setMarkdowns((prev) => ([
      ...prev,
      { id: crypto.randomUUID(), title, content},
    ]));
  }

  // creation de markdown (via input)
  function ajouterMarkdownViaInput(event) {
    // event = l'évenement transmit avec masse informations notamment le target.files    
    // récup le 1er ficher sélectionner (peut être boucle pour tout récup ?)
    const file = event.target.files[0];
    const reader = new FileReader();

    // évenement à la fin de la lecture de .readAsText
    reader.onload = (e) => {
      // récup le contenu
      const content = e.target.result;
      // récup le nom du fichier (remplace .md par '')
      const title = file.name.replace('.md', '');

      // update de markdowns
      setMarkdowns((prev) => [
        ...prev,
        { id: crypto.randomUUID(), title, content },
      ]);
    };

    // lire le fichier en tant que texte
    reader.readAsText(file);

    event.target.value = ''
  }

  function supprimerMarkdown(id) {
    const updatedMarkdowns = markdowns.filter((markdown) => markdown.id !== id);
    setMarkdowns(updatedMarkdowns);
  }
  
  function onUpdateMarkdown(id, newTitle, newContent) {
    // Met à jour la liste des markdowns
    const updatedMarkdowns = markdowns.map((markdown) => {
      return markdown.id === id ? { ...markdown, title: newTitle, content: newContent } : markdown;
    });
    setMarkdowns(updatedMarkdowns); // Mettez à jour l'état avec la nouvelle liste
  }

  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/markdown" element={<MarkdownContainer markdowns={markdowns} onUpdateMarkdown={onUpdateMarkdown} ajouterMarkdownViaInput={ajouterMarkdownViaInput} supprimerMarkdown={supprimerMarkdown}/> } />
          <Route path="/markdown/:markdownid" element={<MarkdownContainer markdowns={markdowns} onUpdateMarkdown={onUpdateMarkdown} ajouterMarkdownViaInput={ajouterMarkdownViaInput} supprimerMarkdown={supprimerMarkdown}/>} />
          <Route path="/" element={<DashboardContainer markdowns={markdowns} ajouterMarkdownViaInput={ajouterMarkdownViaInput} ajouterMarkdown={ajouterMarkdown} supprimerMarkdown={supprimerMarkdown}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
