import { TaskStatus } from '@taskforce/shared-types';

export class ChangeTaskStatusDto {
  public status: TaskStatus;
  public contractor?: string;
}
