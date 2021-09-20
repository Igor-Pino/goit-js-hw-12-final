import './sass/main.scss';
import API from './js-partials/api-service'
import countryTpl from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs'
import debounce from 'lodash.debounce';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import { error, info, defaultStack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { delay } from 'lodash';
defaultModules.set(PNotifyMobile, {});


const inputEl = document.querySelector('input')

inputEl.addEventListener('input', debounce(onInputChange, 500))

const coutryMarkup = document.querySelector('.country-js')
const countryListMarkup = document.querySelector('.country-list-js')

function renderCountryList (country) {
    const listMarkup = countryList(country);
    countryListMarkup.insertAdjacentHTML('afterbegin', listMarkup)
}


function renderCountryCard (country) {
    defaultStack.close()
    const markup = countryTpl(country);
    coutryMarkup.insertAdjacentHTML('afterbegin', markup)
}

function clearMarkup () {
    coutryMarkup.innerHTML = ''
    countryListMarkup.innerHTML = ''
}

function notFoundNote () {
    defaultStack.close()
    error('404 такої країни не знайдено')
}

function specifyRequestNote (country) {
    defaultStack.close()
    renderCountryList(country);
  
    info('уточніть пошук');
}

function tooManyMatchesNote () {
    defaultStack.close();
    info('надто багато співпадінь')
}


function onInputChange(e) {
    
    const searchQuery = e.target.value;

    API.fetchCountryByName(searchQuery)
    
    .then(country => {
        
        
        clearMarkup()

            if(country.length>1&&country.length<10) return specifyRequestNote(country);

             if(country.length>10) return tooManyMatchesNote ();
             renderCountryCard(country);          
                                                     
            })       
    .catch(notFoundNote)       
    .finally(() => {    
    })
}


