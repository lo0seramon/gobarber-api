import { container } from 'tsyringe'

import DiskStoragProvider from './StorageProvider/implementation/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStoragProvider
);
