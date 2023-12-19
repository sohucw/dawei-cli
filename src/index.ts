import {Command} from 'commander';
import {version} from '../package.json';
import {create} from './command/create';
import { update } from './command/update';
const program = new Command('dawei');
program.version(version, '-v --version');

program
    .command('update')
    .description('更新脚手架 dawei-cli')
    .action(async () => {
        await update();
    });

program.command('create').description('创建一个新项目').argument('[name]', '项目名称').action(async (dirName) => {
    create(dirName);
    // if (dirName) {
    //     create(dirName);
    // } else {
    //     console.log(`create ${dirName}`)
    // }
    });

program.parse();