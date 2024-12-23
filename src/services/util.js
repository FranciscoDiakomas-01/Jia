


export default function formatToSocialMidiaNumbers(number){

    const formmater = Intl.NumberFormat("en", {
        notation :'compact'
    })
    return formmater.format(number)
}