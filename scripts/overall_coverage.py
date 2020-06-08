import sys
import json
import glob

# overall_coverage.py: merge the coverage info for different tests of the
# same library.
#
# invoke with: python3 overall_coverage.py dir
#
# For each test .js in dir, there must be corresponding files [test]_coverage_result.json, etc.


def load_coverage(names):
    cov = {}
    for name in names:
        base_name = name.split('.')[0]
        filename = base_name + '_coverage_result.json'
        with open(filename) as file:
            json_cov = file.read()
        cov[name] = json.loads(json_cov)
    return cov

def lines_consistent(cov):
    test_cases = list(cov.keys())
    init_case = test_cases[0]

    fnames = list(cov[init_case]['executable'].keys())
    #fnames.remove('main') # it's named by default but we don't care

    consistent = True
    for fname in fnames:
        # get all executable lines and check sanity
        lines = cov[init_case]['executable'][fname]
        for test_case in test_cases:
            case_lines = cov[test_case]['executable'][fname]
            if case_lines != lines:
                consistent = False
    return consistent

def make_overall_coverage(cov):
    test_cases = list(cov.keys())
    init_case = test_cases[0]

    fnames = list(cov[init_case]['executable'].keys())
    #fnames.remove('main') # it's named by default but we don't care

    if not lines_consistent(cov):
        raise ValueError('Line numbering not consistent, aborting.')

    overall = {}

    for fname in fnames:
        executable_lines = cov[init_case]['executable'][fname]
        executed_lines = set()

        for case in test_cases:
            executed_lines = executed_lines.union(cov[case]['executed'][fname])
        executed_lines = sorted(list(executed_lines))

        overall[fname] = {'executable': executable_lines, 'executed': executed_lines}

    return overall

def print_overall_coverage(overall_cov, file, main_functions):

    # get all functions associated with the test
    total_executable_lines = 0
    total_executed_lines = 0

    for fname in overall_cov:
        executable_lines = set(overall_cov[fname]['executable'])
        executed_lines = set(overall_cov[fname]['executed'])
        total_executable_lines += len(executable_lines)
        total_executed_lines += len(executed_lines)
        missing_lines = list(executable_lines.difference(executed_lines))
        missing_lines = sorted(missing_lines)

        # aggregated info
        #if fname.startswith(test_name):
        #    total_executable_lines += len(executable_lines)
        #    total_executed_lines += len(executed_lines)

        file.write('\n{}: missing lines {}'.format(fname, missing_lines))
        nb_exec_lines = len(executable_lines)
        nb_missing_lines = len(missing_lines)
        coverage_prop = (nb_exec_lines - nb_missing_lines)/nb_exec_lines
        file.write('\n{}: coverage {:.2%}\n'.format(fname, coverage_prop))

        if fname in main_functions :
            print (fname+': {:.2%}'.format(coverage_prop))

    # final print
    total_prop = total_executed_lines / total_executable_lines
    file.write('\n{}: {}/{} ({:.2%}) lines executed'.format("OVERALL: ",
                                                            total_executed_lines,
                                                            total_executable_lines,
                                                         total_prop))
    if len(main_functions) == 0:
        missing_lines = total_executable_lines - total_executed_lines
        print ("Number of Untested Lines: " + format(missing_lines))
        print ('Test Suite Line Coverage: {:.2%}'.format(total_prop))


def get_filenames(path):
    files = [f for f in glob.glob(path + "**/*.js", recursive=True)]
    return files

def read_function_names(filename):
    with open(filename) as functions_file:
        functions = functions_file.readlines()
    functions = [line.rstrip() for line in functions]
    return functions

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('No input files provided. Aborting')
    else:
        directory   = sys.argv[1]
        filenames = get_filenames(directory)
        #print("filenames: "+format(filenames))
        coverage = load_coverage(filenames)
        functions = []
        if len(sys.argv) > 2:
            functions_file = sys.argv[2]
            functions = read_function_names(functions_file)
        overall_coverage = make_overall_coverage(coverage)
        f= open(directory+"/coverage/coverage.txt","w+")
        print_overall_coverage(overall_coverage, f, functions)
