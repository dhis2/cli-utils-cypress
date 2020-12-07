import axios from 'axios'
import { resourcePath } from '../resourcePath'
import getInitialData from './db'

export const resetDb = () => axios.post(resourcePath('reset'), getInitialData())
