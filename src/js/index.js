import yellow from 'javascript-yellow';

// Trigger building of CSS
import style from "./../css/styles.styl";

window.addEventListener('load', () => {
	console.log(`%noah.be %c(${process.env.MODE.toUpperCase()})`, `background-color: ${yellow}; font-weight: 700;`, `background-color: ${yellow}; font-style: italic;`);
});