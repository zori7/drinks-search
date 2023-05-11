"use client"

import {FC, useContext, useEffect, useMemo} from "react";
import {DrinkContext} from "@/context/DrinkContext";
import {Container} from "@/components/layout/Container";
import {useRouter} from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import {Drink} from "@/hooks/useFetchDrinks";

const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
  margin-top: 30px;
  align-self: center;

  img {
    object-fit: cover;
  }
`

const Title = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`

const Label = styled.p`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: bold;
  width: 100%;
`

const IngredientContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  
  font-size: 17px;
`

const InstructionsContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  
  font-size: 17px;
`

const DrinkPage: FC = () => {
    const router = useRouter()
    const {drink} = useContext(DrinkContext)

    useEffect(() => {
        if (!drink) {
            router.push('/')
        }
    }, [drink, router])

    const ingredients = useMemo(() => {
        if (!drink) return []

        const ingredients: Array<{
            title: string
            measure: string
        }> = []

        for (let i = 1; i <= 15; i++) {
            const title = drink[`strIngredient${i}` as keyof Drink]
            const measure = drink[`strMeasure${i}` as keyof Drink]

            if (title) {
                ingredients.push({ title, measure })
            }
        }

        return ingredients
    }, [drink])

    if (!drink) {
        return null
    }

    return (
        <Container>
            <ImageContainer>
                <Image width={96} height={96} src={drink.strDrinkThumb} alt={drink.strDrink}/>
            </ImageContainer>
            <Title>{drink?.strDrink}</Title>
            <Label>Ingredients:</Label>
            <IngredientContainer>
                {ingredients.map((ingredient) => (
                    <p key={ingredient.title}>
                        {ingredient.title} ({ingredient.measure})
                    </p>
                ))}
            </IngredientContainer>
            <InstructionsContainer>
                {drink.strInstructions}
            </InstructionsContainer>
        </Container>
    )
}

export default DrinkPage
