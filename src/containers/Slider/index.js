import { useEffect, useState } from "react";//useState pour suivre l’index du slide affiché et useEffect pour lancer une action quand le composant se met à jour (ici : passer à la slide suivante)
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";//Importe une fonction utilitaire personnalisée qui extrait le mois d’une date (pour affichage stylisé).


import "./style.scss";

const Slider = () => {//Déclaration du composant principal Slider
  const { data } = useData();//On récupère la donnée brute contenant tous les événements via le DataContext
  const [index, setIndex] = useState(0);//On stocke l’index de la slide actuellement affichée (commence à 0)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>//data.focus est un tableau d’événements et sort() trie les éléments d’un tableau
  new Date(evtA.date) - new Date(evtB.date)//// On les trie du plus récent au plus ancien avec Date B - Date A
  );

  // si data et data.focus sont defini alors on recupere la longueur du tableau sinon 0
  const slides = data && data.focus ? data.focus.length : 0;//On compte le nombre total de slides à afficher
  const nextCard = () => {//fonction de défilement automatique
    setTimeout(
      // On ajoute -1 pour verifié que l'index actuel ne depasse pas le total des slides , action faites toutes les 5s
      () => setIndex(index < slides -1 ? index + 1 : 0), 5000//Si index atteint la fin, on revient à 0, boucle infinie
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {byDateDesc?.map((event, radioIdx) => (
                <input
                  key={event.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // ajout readOnly afin de ne plus avoir l'erreur du checked
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
