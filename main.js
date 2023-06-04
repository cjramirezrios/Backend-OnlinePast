const app=require('./app');
const main=()=>{
  try{
    app.listen(app.get('port'),()=>{
      console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
    })
  }catch(err){
    throw new Error('Ocurrio un error en el servidor');
  }
}
main();