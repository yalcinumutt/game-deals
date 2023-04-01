import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CheapSharkDataSource} from '../datasources';
import {Deals} from '../models';

export interface CheapShark {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  deals(storeId: number, upperPrice: number): Promise<Deals[]>
}

export class CheapSharkProvider implements Provider<CheapShark> {
  constructor(
    // CheapShark must match the name property in the datasource json file
    @inject('datasources.CheapShark')
    protected dataSource: CheapSharkDataSource = new CheapSharkDataSource(),
  ) {}

  value(): Promise<CheapShark> {
    return getService(this.dataSource);
  }
}
