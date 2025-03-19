//Le StrictMode est un composant React utilisé pour activer certaines vérifications supplémentaires dans le code afin d'aider à repérer les problèmes pendant le développement
import { StrictMode } from 'react'
//createRoot est une fonction qui permet de lier une application React à un élément DOM spécifié (par exemple, l'élément <div id="root"> dans index.html).
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//=>main.jsx : généralement le point d'entrée de l'application React. C'est ici que React monte l'application dans le DOM de la page web. C'est le fichier où vous initialisez l'application et la reliez à un élément HTML, généralement un div avec un id="root".

//dom integrer html with js
//Le DOM est la structure interne que le navigateur utilise pour organiser et manipuler les éléments de votre page web (comme les balises HTML) pendant le rendu.
//rendre l'app dans un element dom avec id = root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
