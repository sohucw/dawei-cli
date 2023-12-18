
import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';
// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) => 
            // console.info(item)
            chalk.green(item)
        )
    }
});

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 当前工作目录
    binary: 'git', // 指定 git 二进制文件路径
    maxConcurrentProcesses: 6 // 最大并发进程数
};
export const clone = async (url: string, projectName: string, options: string[]) => {

    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中: ', {
            estimate: 7000, // 预计下载时间
        });
        // 下面就是一些相关的提示
        console.log();
        console.log(chalk.blueBright(`==================================`));
        console.log(chalk.blueBright(`=== 欢迎使用 dawei-cli 脚手架 ===`));
        console.log(chalk.blueBright(`==================================`));
        console.log();

        console.log(`项目创建成功 ${chalk.blueBright(projectName)}`);
        console.log(`执行以下命令启动项目：`);
        console.info(`cd ${chalk.blueBright(projectName)}`);
        console.info(`${chalk.yellow('pnpm')} install`);
        console.info(`${chalk.yellow('pnpm')} run dev`);

    } catch (error) {
        console.error(chalk.red('代码下载失败'));
        // console.log(error);
    }
}