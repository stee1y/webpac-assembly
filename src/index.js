import Post from './Post'
import'./styles/styles.css'
import webpackLogo from './img/webpack.png'

const post = new Post('Webpack post title', webpackLogo)
console.log('Post to string:', post.toString())