import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Steps from './components/StepsList.vue'
import StatusTag from './components/StatusTag.vue'
import ImageCardGrid from './components/ImageCardGrid.vue'
import PartList from './components/PartList.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Steps', Steps)
    app.component('StatusTag', StatusTag)
    app.component('ImageCardGrid', ImageCardGrid)
    app.component('PartList', PartList)
  }
}
