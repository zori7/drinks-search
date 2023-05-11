import {useEffect, useState} from "react";

export interface Drink {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strIngredient15: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string
    strMeasure15: string
    strInstructions: string
}

const useFetchDrinks: (query: string) => Array<Drink> = (query) => {
    const [drinks, setDrinks] = useState<Array<Drink>>([])

    useEffect(() => {
        if (!query?.length) {
            setDrinks([])
            return
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(res => res.json())
            .then(res => setDrinks(res?.drinks || []))
    }, [query])

    return drinks
}

export default useFetchDrinks
