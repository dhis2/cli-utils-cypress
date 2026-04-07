import axios from 'axios'
import { resourcePath } from '../resourcePath.js'
import getInitialData from './db.cjs'

export const resetDb = () => axios.post(resourcePath('reset'), getInitialData())
