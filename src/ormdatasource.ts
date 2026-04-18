import { DataSource } from 'typeorm'
import {default as config} from './ormconfig'

export default new DataSource(config);