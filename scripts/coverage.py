import sys
import json
import re
import os.path
import fileinput

# coverage.py: assemble the JSIL coverage output from Rosette into JS coverage
# information
#
# invoke with: python3 coverage.py [test].js [js2jsil_line_numbers].txt [raw_coverage_dir]
#
# there must be corresponding files:
# - [test]_coverage.txt (JSIL runtime coverage info from Rosette)
# - [test]_line_numbers.json (mapping form JSIL line numbers to JS line numbers)

js2jsilmapping_re = "\((\w+), (-?\d+), (-?\d+)\)"
jsil_re           = "\"(\w+)\"\s*(-?\d+)"

def get_jsil_coverage(file, raw_coverage_dir):
    filename = raw_coverage_dir + file + '_raw_coverage.txt'
    with open(filename) as coverage_file:
        lines = coverage_file.readlines()
    lines = [line.rstrip() for line in lines]
    lines = [line.split() for line in lines]
    lines = [(line[0][1:-1], int(line[1])) for line in lines]
    coverage = {}
    for (fname, fline) in lines:
        if fname not in coverage:
            coverage[fname] = []
        coverage[fname].append(fline)
    for fname in coverage:
        coverage[fname] = sorted(set(coverage[fname]))
    return coverage

def get_js_file(filename):
    with open(filename) as js_file:
        lines = js_file.readlines()
    lines = [line.rstrip() for line in lines]
    return lines

#js_line[fname][jsil line number] = js line number
def get_js_jsil_mapping():
    filename = sys.argv[2]
    with open(filename) as js2jsil_file:
        lines = js2jsil_file.readlines()
    js_line = {}

    for line in lines:
        #print("Trying to read line "+line)
        matches        = re.search(js2jsilmapping_re, line)
        proc_name      = (matches.group(1))
        js_line_number = (matches.group(3))
        #print("Proc "+proc_name+"Found jsil line "+format(matches.group(2)))
        if proc_name not in js_line:
            js_line[proc_name] = []
        js_line[proc_name].append(js_line_number)
    return js_line, js_line.keys()

def to_json(exec_lines, found_lines, file):
    res = {'executable': exec_lines,
           'executed': found_lines}
    res_json = json.dumps(res, indent=2)
    filename = file + '_coverage_result.json'
    with open(filename, 'w') as out_file:
        out_file.write(res_json)

def make_coverage(filename, raw_coverage_dir):
    base_file = os.path.basename(filename).split('.')[0]
    dir_name = os.path.dirname(filename)
    coverage = get_jsil_coverage(base_file, raw_coverage_dir)
    js_lines = get_js_file(filename)
    mapping, js_fnames = get_js_jsil_mapping()

    # executable js lines
    exec_lines = {}
    for fname in js_fnames:
        if fname not in exec_lines:
            exec_lines[fname] = []

        for js_line in mapping[fname]:
            if (js_line not in exec_lines[fname]) and (js_line != -1):
                exec_lines[fname].append(js_line)

        exec_lines[fname] = sorted(exec_lines[fname])
#    print('exec_lines:\t{}'.format(exec_lines))

    # js lines we actually ran
    found_lines = {}

    # initialize all functions to empty
    for fname in js_fnames:
        found_lines[fname] = []

    for fname in coverage:
        if fname in js_fnames:
            for jsil_line in coverage[fname]:
                #print('trying to access '+fname+', jsil_line: '+format(jsil_line))
                js_line = mapping[fname][jsil_line]
                if (js_line not in found_lines[fname]) and (js_line != -1):
                    found_lines[fname].append(js_line)
#    print('found_lines:\t{}'.format(found_lines))

    # dump to JSON so we can merge the results from different test cases
    # of the same library (line numbers must match!)
    to_json(exec_lines, found_lines, filename.split('.')[0])

    return exec_lines, found_lines

def print_coverage(exec_lines, found_lines):
    js_fnames = list(exec_lines.keys())

    for fname in js_fnames:

        missing_lines = []
        for exec_line in exec_lines[fname]:
            if exec_line not in found_lines[fname]:
                missing_lines.append(exec_line)

        if missing_lines == []:
            print('{}: executed all lines'.format(fname))
        else:
            print('{}: missing lines {}'.format(fname, missing_lines))

        nb_exec_lines = len(exec_lines[fname])
        nb_missing_lines = len(missing_lines)
        coverage_prop = (nb_exec_lines - nb_missing_lines)/nb_exec_lines
        print('{}: coverage {:.2%}\n'.format(fname, coverage_prop))


if __name__ == "__main__":
    if (len(sys.argv) < 3):
        print("No input file provided. Aborting.")
    else:
        filename = sys.argv[1]
        js2jsilmapping = sys.argv[2]
        raw_coverage_dir = sys.argv[3]
        base_file = os.path.basename(filename).split('.')[0]
        exec_lines, found_lines = make_coverage(filename, raw_coverage_dir)
        print_coverage(exec_lines, found_lines)
