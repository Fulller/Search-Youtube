let key = 'AIzaSyBzZYEEXnO39tIoiFn0QF5sNCk09UkxGe0'
let root = document.querySelector('#root')
let input = document.querySelector('#input')
let submit = document.querySelector('#submit')


let app = {
    querry: 'sontungmtp',
    handleEvent: function (){
        submit.onclick = function (){
            app.querry = input.value
            app.start()
        }
    },
    render: function (app){
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${app.querry}&key=${key}`)
                .then(response=>{
                return  response.json()
                }
                )
                .then(data=>{
                    console.log(data)
                    let html = data.items.map(item => {
                        if(item.id.videoId){
                            return `
                                <iframe width="360" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            `
                        }
                    }).join()
                    root.innerHTML = html
                })
    },
    start: async function (){
        await this.render(app)
        this.handleEvent()
    }
}
app.start()


    
        