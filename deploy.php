<?php

namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/npm.php';

// Config

set('bin/php', function () {
    return '/usr/local/bin/php';
});

set('application', 'newseminar');
set('repository', 'https://github.com/Ahmadfaisalkeren/newseminar.git');

set('git_tty', true);
set('git_ssh_command', 'ssh -o StrictHostKeyChecking=no');

set('keep_releases', 5);
set('writeable_mode', 'chmod');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', [
    "bootstrap/cache",
    "storage",
    "storage/app",
    "storage/framework",
    "storage/logs",
]);

set('composer_options', '--verbose --prefer-dist --no-progress --no-interaction --no-dev --optimize-autoloader');

// Hosts
host('production')
 ->setHostName(getenv('DEPLOY_HOST'))
 ->set('remote_user', getenv('DEPLOY_USER'))
 ->set('port', getenv('DEPLOY_PORT'))
 ->set('branch', getenv('DEPLOY_BRANCH'))
 ->set('deploy_path', getenv('DEPLOY_PATH'));


// Tasks
task('deploy:secrets', function () {
    file_put_contents(__DIR__ . '/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path') . '/shared');
});

desc('Build assets');
task('deploy:build', [
    'npm:install',
]);

task('deploy', [
    'deploy:prepare',
    'deploy:secrets',
    'deploy:vendors',
    'deploy:shared',
    'artisan:storage:link',
    'artisan:queue:restart',
    'deploy:publish',
    'deploy:unlock',
]);

// Hooks

after('deploy:failed', 'deploy:unlock');
