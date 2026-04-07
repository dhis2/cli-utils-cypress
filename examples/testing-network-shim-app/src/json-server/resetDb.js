import axios from 'axios'
import { resourcePath } from '../resourcePath.js'
import getInitialData from './db.js'

export const resetDb = () => axios.post(resourcePath('reset'), getInitialData())
