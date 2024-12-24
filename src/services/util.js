


export default function formatToSocialMidiaNumbers(number){

    const formmater = Intl.NumberFormat("en", {
        notation :'compact'
    })
    return formmater.format(number)
}

export function shuffleArray(array){
    return array.sort(() => Math.random() - 0.5)
}   