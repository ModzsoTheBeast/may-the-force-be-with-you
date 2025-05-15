import { SimulateResponse } from '@app/@types';
import { Observable, of } from 'rxjs';

export const SIMULATION_RESULT_MOCK: Observable<SimulateResponse> = of({
  simulationId: 'sim-123456789',
});
