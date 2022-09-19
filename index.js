// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	const comparison = (elemA, elemB) => new Date(elemB["fields"]["date_debut"]) - new Date(elemA["fields"]["date_debut"])
	let sortedArray = filmingLocations.sort(comparison)
	return sortedArray;
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
let temparray = sortFilmingLocationsByStartDate()
console.log(temparray[0],temparray[temparray.length-1])





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let counter = 0;
	const temp = []
	for (let i=0; i<getFilmingLocationsNumber()-1; i++){
		if ((filmingLocations[i]["fields"]["annee_tournage"] == "2020") && (!(temp.find(x => x == filmingLocations[i]["fields"]["adresse_lieu"])))) {
			temp[temp.length] = filmingLocations[i]["fields"]["adresse_lieu"]
			counter = counter + 1;
		}
	}
	return counter
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
console.log("The number of filming locations in 2020 is ",getFilmingLocationsNumber2020())






/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	const filmingLocationsPerYear = {}
	for (const elem of filmingLocations){
		if (!(elem["fields"]["annee_tournage"] in filmingLocationsPerYear)) {
			filmingLocationsPerYear[elem["fields"]["annee_tournage"]] = 1
		} else {
			filmingLocationsPerYear[elem["fields"]["annee_tournage"]] += 1
		}
	}
	return filmingLocationsPerYear
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
console.log(getFilmingLocationsNumberPerYear())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	const filmingLocationsPerDistrict = {}
	const temp = []
	for (const film of filmingLocations){
		if (!(film["fields"]["ardt_lieu"] in filmingLocationsPerDistrict)) {
			filmingLocationsPerDistrict[film["fields"]["ardt_lieu"]] = 1
			temp[temp.length] = film["fields"]["adresse_lieu"]
		} else if (!(film["fields"]["adresse_lieu"] in temp)) {
			filmingLocationsPerDistrict[film["fields"]["ardt_lieu"]] += 1
			temp[temp.length] = film["fields"]["adresse_lieu"]
		}
	}
	return filmingLocationsPerDistrict
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
console.log(getFilmingLocationsNumberPerDistrict())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	const result = []
	for (const film of filmingLocations){
		//if (!(result.find(x => x == film["fields"]["nom_tournage"]))) {
		//	result[result.lengt] = {film: film["fields"]["nom_tournage"], locations: 1}
		//} else {
		//	console.log("yes")
		//	result[0][locations] += 1
		//}

		let bool = false
		if (result.length == 0) {
			result[result.length] = {'film':film["fields"]["nom_tournage"], 'locations':1}
		} else {
			for (const elem of result){
				if (elem['film'] == film["fields"]["nom_tournage"]) {
					elem['locations'] += 1
					bool = true
				}
			}
			if (!bool) {
				result[result.length] = {'film':film["fields"]["nom_tournage"], 'locations':1}
				bool = false
			}
		}
	}
	const condition = (a,b) => b['locations'] - a['locations']
	result.sort(condition)
	return result
}
console.log("\n\n//////////////////////////////////////////////////////////////////")
console.log(getFilmLocationsByFilm())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	return getFilmLocationsByFilm().length.toString()
}

//console.log('The number of different films is ',getNumberOfFilms(),'.')





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	const PatriotLocations = []
	for (const film of filmingLocations) {
		if ((film["fields"]["nom_tournage"] == "LRDM - Patriot season 2") && (!(film["fields"]["adresse_lieu"] in PatriotLocations))) {
			PatriotLocations[PatriotLocations.length] = film["fields"]["adresse_lieu"]
		}
	}
	return PatriotLocations
}

//console.log(getArseneFilmingLocations())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilms) {
	const films = {}
	for (const f of filmingLocations) {
		if (favoriteFilms.find(fav => fav == f["fields"]["nom_tournage"])) {
			let nom_tournage = f["fields"]["nom_tournage"]
			let arr_lieu = f["fields"]["ardt_lieu"]

			if (!(nom_tournage in films)) {
				films[nom_tournage] = []
				films[nom_tournage][films[nom_tournage].length] = arr_lieu
			} else if (!(films[nom_tournage].find(x => x == arr_lieu))) {
				films[nom_tournage][films[nom_tournage].length] = arr_lieu
			}
		}
	}
	return films
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

//console.log(getFavoriteFilmsLocations(favoriteFilms))





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const films = {}
	for (const f of filmingLocations) {
		let nom_tournage = f["fields"]["nom_tournage"]
		let loc = f["fields"]["adresse_lieu"]

		if (!(nom_tournage in films)) {
			films[nom_tournage] = []
			films[nom_tournage][films[nom_tournage].length] = loc
		} else if (!(films[nom_tournage].find(x => x == loc))) {
			films[nom_tournage][films[nom_tournage].length] = loc
		}
	}
	return films
}

//console.log(getFilmingLocationsPerFilm())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const typesOfFilm = {}
	for (const f of filmingLocations) {
		let type_tournage = f["fields"]["type_tournage"]
		if (!(type_tournage in typesOfFilm)) {
			typesOfFilm[type_tournage] = 1
		} else {
			typesOfFilm[type_tournage] += 1
		}
	}
	return typesOfFilm
}

//console.log(countFilmingTypes())





/////////////////////////////////////////////////////////////////////////////////
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const countTypesOfFilm = []
	const typesOfFilm = countFilmingTypes()
	for (const t in typesOfFilm) {
		countTypesOfFilm[countTypesOfFilm.length] = {type: t, count: typesOfFilm[t]}
	}
	return countTypesOfFilm
}

//console.log(sortedCountFilmingTypes())





/////////////////////////////////////////////////////////////////////////////////
/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function filmingLocationWithTheLongestDuration () {
	let longestDuration = filmingLocations[0]
	for (const film of filmingLocations) {

	}
	return longestDuration
}
//console.log(filmingLocationWithTheLongestDuration())

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
function averageFilmingDuration () {
	return
}
