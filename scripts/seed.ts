const {PrismaClient} = require("@prisma/client")

const database = new PrismaClient()

async function main(){
    try {
        await database.category.createMany({
            data:[  
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Photography"},
                {name: "Accounting"},
                {name: "Engineering"},
                {name: "Filmaking"},
            ]
        })

    console.log("Success")


    }catch(error){
        console.log("Error seeding the catogories" , error)
    }finally{
        await database.$disconnect()
    }
}

main()