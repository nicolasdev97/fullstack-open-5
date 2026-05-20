const sequelize = require('./util/db')

const main = async () => {
    try {
        const blogs = await sequelize.query('SELECT * FROM blogs')

        blogs[0].forEach(blog => {
            console.log(
                `${blog.author}: '${blog.title}', ${blog.likes} likes`
            )
        })

        process.exit(0)
    } catch (error) {
        console.error('Error:', error)
        process.exit(1)
    }
}

main()