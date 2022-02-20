import {authors, quotes} from "../mockData/mockData"
import {Quote, Author} from "../mockData/types"

export const generalServerController = {

    getHome: (req: any, res: any) => {

        res.send(
      
            `<p style="display:grid; place-items: center; font-size: 26px; color: #000; font-weight: 900;">Welcome to Quotes, use / and arrays for navigation in the backend server</p>
          
            <div style = "display: grid; grid-template-rows: repeat(4, 3.33fr); grid-gap: 35px; place-items:center; background-color: #191919; height: 100vh; margin: 0 0; paddig: 0 0; box-sizing: border-box;">
                
                <a style="color: #fff; text-decoration: none; font-size: 22px;" href = "/quotes">Go to Quotes</a>
                
                <a style="color: #fff; text-decoration: none; font-size: 22px;" href = "/authors">Go to Authors</a>
    
                <a style="color: #fff; text-decoration: none; font-size: 22px;">
                    If you want to go to individual items just add an number id after / like quotes/1 gets the first quote etc
                </a>
    
                <a style="color: #fff; text-decoration: none; font-size: 22px;">
                    If you want to get random object from the array you can have endpoint random-["name of the array"] and you have use it in front end etc
                </a>
    
            </div>`
    
        );

    },

    getDb: (req: any, res: any) => {

        const db = {"quotes": quotes, "authors": authors}
        res.send(db)

    },

    getRandom: (req: any, res: any) => {

        const randomQuote: Quote = quotes[Math.floor(Math.random() * quotes.length)]
        res.send(randomQuote);

    }

}