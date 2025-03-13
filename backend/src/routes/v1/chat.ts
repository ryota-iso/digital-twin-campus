import express from 'express';
import { interpretUserCommand } from '../../utils/interpretUserCommand';
import { getDataByAmbiguousDbQuery } from '../../utils/getDataByAmbiguousDbQuery';

const router = express();

router.get('/', async (req, res) => {
  const tmp = await getDataByAmbiguousDbQuery(
    'ユビキタスシステムアーキテクチャの教室はどこにありますか？'
  );
  res.json(tmp);
});

router.post('/', async (req, res) => {
  const { chatMessage, currentLocation } = req.body;

  const orderType = await interpretUserCommand(chatMessage);

  function RouteCalculation(currentLocation: string, destination: string) {
    return { tmp: 'tmp' };
  }

  switch (orderType) {
    case 'getRouteMap':
      // 現在地と目的地から最適な経路を計算する
      const order = await RouteCalculation(currentLocation, 'mu');

      res.json({ type: orderType, order });
      break;
    case 'listMapInfo':
      const courses = await getDataByAmbiguousDbQuery(chatMessage);
      res.json({ type: orderType, courses });
      break;
    case 'otherOrder':
      res.status(400).json({ type: 'UnknownOrder' });
    default:
      res.status(400).json({ message: 'Invalid command type.' });
      break;
  }
});

export default router;
