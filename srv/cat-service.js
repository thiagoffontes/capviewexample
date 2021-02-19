const cds = require('@sap/cds')
module.exports = cds.service.impl(async function () {
    const db = await cds.connect.to('db')

    this.on('testeMultiInsertError', async(req) => {
        const reqestUser = new cds.User({
            id: "thiagoffontes@icloud.com",
        });
        const request = new cds.Request({ user: reqestUser });
        const tx = cds.transaction(request);
        
        //inserindo chave que já existe para dar erro, a idéia é que a linha teste2 não seja inserida
        const teste1 = "INSERT INTO \"my_bookshop_PoItem\" (\"PoNumber\", \"ItemNumber\" ,\"Value\")" +
                         "VALUES( 3, 3 ,4.0)";
        const teste2 = "INSERT INTO \"my_bookshop_PoItem\" (\"PoNumber\", \"ItemNumber\" ,\"Value\")" +
                         "VALUES( 3, 5 ,4.0)";

        try{
            var oResult = await tx.run([teste1,teste2])
            tx.commit();
            return 200;
        } catch (e){
            console.log(e);
            tx.rollback();
            req.reject(400, e.message);
            return 400;
        }
    });

    this.on('testeMultiInsertSuccess', async(req) => {
        const reqestUser = new cds.User({
            id: "thiagoffontes@icloud.com",
        });
        const request = new cds.Request({ user: reqestUser });
        const tx = cds.transaction(request);
        
        const teste1 = "INSERT INTO \"my_bookshop_PoItem\" (\"PoNumber\", \"ItemNumber\" ,\"Value\")" +
                         "VALUES( 3, 4 ,4.0)";
        const teste2 = "INSERT INTO \"my_bookshop_PoItem\" (\"PoNumber\", \"ItemNumber\" ,\"Value\")" +
                         "VALUES( 3, 5 ,4.0)";

        try{
            var oResult = await tx.run([teste1,teste2])
            tx.commit();
            return 200;
        } catch (e){
            console.log(e);
            tx.rollback();
            req.reject(400, e.message);
            return 1;
        }
        return;
    });


    this.on ('getNewId', async () => {
        var vCurrentValue;
        try {
            var aResult = await db.run("SELECT MAX(\"PoNumber\") FROM \"my_bookshop_PoHeader\"");
            vCurrentValue = Object.values(aResult[0])[0];
        } catch (err){
            vCurrentValue = 0;
        }
        return vCurrentValue + 1;
    });
})